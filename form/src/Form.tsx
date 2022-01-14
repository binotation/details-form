import { useState } from 'react'
import Cookies from 'universal-cookie'
import CryptoJS from 'crypto-js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import { UrlParams, FormValues } from './exports/types'
import { DEFAULT_VALUES, saveHandler, DEFAULT_ALERT_DIALOG } from './exports/constants'
import validationSchema from './exports/validationSchema'
import FormButtons from './form-sections/FormButtons'
import PersonalDetails from './form-sections/PersonalDetails'
import SuperDetails from './form-sections/SuperDetails'
import TaxDetails from './form-sections/TaxDetails'
import WorkEligibility from './form-sections/WorkEligibility'
import AlertDialog from './form-sections/AlertDialog'

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

    const [alertDialogPartialProps, setAlertDialogPartialProps] = useState(DEFAULT_ALERT_DIALOG)
    const closeAlertDialog = () => {
        const { open: _, ...otherProps } = alertDialogPartialProps
        setAlertDialogPartialProps({ open: false, ...otherProps })
    }
    const openAlertDialog = (title: string, description: string) => { setAlertDialogPartialProps({ open: true, title, description }) }

    const onSubmit = (data: FormValues) => {
        const { IdDocuments: idDocuments, ...fields } = data
        const body = { id, token, data: fields }

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
                        openAlertDialog('Success!', 'Your information has been successfully submitted.')
                        break
                    }
                    case 401: {
                        openAlertDialog('Unauthorized', 'You are not authorized to submit your information.')
                        break
                    }
                    default: {
                        openAlertDialog('Error', 'An unknown error occurred.')
                    }
                }
            })
            .catch(err => {
                openAlertDialog('Error', `Name: ${err.name}\nMessage: ${err.message}`)
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
                        alert('Upload success')
                        break
                    }
                    case 401: {
                        alert('Upload unauthorized')
                        break
                    }
                    default: {
                        alert('Upload error')
                    }
                }
            })
            .catch(err => {
                alert('Upload error: ' + err.message)
            })
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form style={{ width: '56vw', maxWidth: '640px' }} onSubmit={handleSubmit(onSubmit)}>
                <PersonalDetails control={control} />
                <SuperDetails control={control} watch={watch} />
                <TaxDetails control={control} />
                <WorkEligibility control={control} />
                <FormButtons token={token} id={id} getValues={getValues} />
            </form>
            <AlertDialog handleOk={closeAlertDialog} {...alertDialogPartialProps} />
        </Box>
    )
}

export default Form