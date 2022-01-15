import { useState } from 'react'
import Cookies from 'universal-cookie'
import CryptoJS from 'crypto-js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import { UrlParams, FormValues, SubmissionResult } from './exports/types'
import { DEFAULT_VALUES, saveHandler, DEFAULT_RESULT_DIALOG } from './exports/constants'
import validationSchema from './exports/validationSchema'
import FormButtons from './form-sections/FormButtons'
import PersonalDetails from './form-sections/PersonalDetails'
import SuperDetails from './form-sections/SuperDetails'
import TaxDetails from './form-sections/TaxDetails'
import WorkEligibility from './form-sections/WorkEligibility'
import ResultDialog from './form-sections/ResultDialog'

function Form({ id, token }: UrlParams) {
    // <---------- Get saved form data ---------->
    const cookies = new Cookies()
    const savedDataCiphertext: string = cookies.get('savedData-' + id)
    let savedData;

    if (savedDataCiphertext !== undefined) {
        const savedDataDecrypted: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(savedDataCiphertext, CryptoJS.SHA256(token).toString())
        savedData = JSON.parse(savedDataDecrypted.toString(CryptoJS.enc.Utf8))
    }
    // <----------------------------------------->

    const { handleSubmit, control, watch, getValues } = useForm({
        defaultValues: savedData ?? DEFAULT_VALUES,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const [resultDialogPartialProps, setResultDialogPartialProps] = useState(DEFAULT_RESULT_DIALOG)
    const closeResultDialog = () => {
        const { open: _, ...otherProps } = resultDialogPartialProps
        setResultDialogPartialProps({ open: false, ...otherProps })
    }
    const openResultDialog = ({ loading, title, description }: { loading: boolean, title: string, description: string }) => {
        setResultDialogPartialProps({ open: true, loading, title, description })
    }

    const onSubmit = (data: FormValues) => {
        const { IdDocuments: idDocuments, ...fields } = data
        const body = { id, token, data: fields }

        let submissionResult: string;
        let uploadResult: string;
        const title = 'Submit Status'

        openResultDialog({ loading: true, title, description: '' })

        fetch('submit', {
            method: 'POST',
            mode: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(resp => {
                switch (resp.status) {
                    case 200: {
                        saveHandler(id, token, getValues)
                        submissionResult = SubmissionResult.Success
                        break
                    }
                    case 401: {
                        submissionResult = SubmissionResult.Unauthorized
                        break
                    }
                    default: {
                        submissionResult = SubmissionResult.UnknownError
                    }
                }
            })
            .catch(err => {
                submissionResult = `An error occurred. Name: ${err.name}, Message: ${err.message}`
            })

        const filesForm = new FormData()
        filesForm.append('id', id)
        filesForm.append('token', token)
        Array.from(idDocuments).forEach((file, index) => {
            filesForm.append(`document${index}`, file)
        })

        fetch('upload', {
            method: 'POST',
            mode: 'same-origin',
            body: filesForm
        })
            .then(resp => {
                switch (resp.status) {
                    case 200: {
                        uploadResult = SubmissionResult.Success
                        break
                    }
                    case 401: {
                        uploadResult = SubmissionResult.Unauthorized
                        break
                    }
                    default: {
                        uploadResult = SubmissionResult.UnknownError
                    }
                }
                openResultDialog({ loading: false, title, description: `Form submission: ${submissionResult}\nDocument upload: ${uploadResult}` })
            })
            .catch(err => {
                uploadResult = `An error occurred. Name: ${err.name}, Message: ${err.message}`
                openResultDialog({ loading: false, title, description: `Form submission: ${submissionResult}\nDocument upload: ${uploadResult}` })
            })
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form style={{ width: '56vw', maxWidth: '640px' }} onSubmit={handleSubmit(onSubmit)}>
                <PersonalDetails control={control} />
                <SuperDetails control={control} watch={watch} />
                <TaxDetails control={control} />
                <WorkEligibility control={control} />
                <FormButtons token={token} id={id} getValues={getValues} openResultDialog={openResultDialog} />
            </form>
            <ResultDialog handleOk={closeResultDialog} {...resultDialogPartialProps} />
        </Box>
    )
}

export default Form
