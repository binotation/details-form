import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import CryptoJS from 'crypto-js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import { UrlParams, FormValues, SubmissionResult } from './exports/types'
import { DEFAULT_VALUES, saveForm, FIELD_ORDER } from './exports/constants'
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
    let savedData

    if (savedDataCiphertext !== undefined) {
        try {
            const savedDataDecrypted: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(savedDataCiphertext, CryptoJS.SHA256(token).toString())
            savedData = JSON.parse(savedDataDecrypted.toString(CryptoJS.enc.Utf8))
        }
        catch (err: any) { }
    }
    // <----------------------------------------->

    const { handleSubmit, control, watch, getValues } = useForm({
        defaultValues: savedData ?? DEFAULT_VALUES,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const [submissionResultDialogOpen, setSubmissionResultDialogOpen] = useState(false)
    const [formResult, setFormResult] = useState('')
    const [uploadResult, setUploadResult] = useState('')
    function closeSubmissionResultDialog() { setSubmissionResultDialogOpen(false) }

    const onSubmit = (data: FormValues) => {
        const { IdDocuments: idDocuments, ...fields } = data
        const submitBody = { id, token, data: fields }

        const filesForm = new FormData()
        filesForm.append('id', id)
        filesForm.append('token', token)
        Array.from(idDocuments).forEach((file, index) => {
            filesForm.append(`document${index}`, file)
        })

        setSubmissionResultDialogOpen(true)
        setFormResult('')
        setUploadResult('')

        function errorMessage(name: string, message: string) {
            return `An error occurred.\n\tName: ${name},\n\tMessage: ${message}`
        }

        async function handleResponse(resp: Response, setResult: React.Dispatch<React.SetStateAction<string>>) {
            switch (resp.status) {
                case 200: {
                    if (setResult === setFormResult) saveForm(id, token, getValues)
                    setResult(SubmissionResult.Success)
                    break
                }
                case 401: {
                    setResult(SubmissionResult.Unauthorized)
                    break
                }
                case 500: {
                    let resultMessage: string
                    try {
                        const responseMessage = await resp.json()
                        const errors: any[] = responseMessage.errors
                        resultMessage = '[\n' + errors.reduce((prevError, error) => (
                            prevError + errorMessage(error?.name, error?.message) + ',\n'
                        ), '') + ']'
                    }
                    catch (err: any) {
                        resultMessage = SubmissionResult.UnknownError
                    }

                    setResult(resultMessage)
                    break
                }
                default: {
                    setResult(SubmissionResult.UnknownError)
                }
            }
        }

        async function handleError(err: any, setResult: React.Dispatch<React.SetStateAction<string>>) {
            setResult(errorMessage(err.name, err.message))
        }

        fetch('/api/submit', {
            method: 'POST',
            mode: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitBody)
        })
            .then(res => { handleResponse(res, setFormResult) })
            .catch(err => { handleError(err, setFormResult) })

        fetch('/api/upload', {
            method: 'POST',
            mode: 'same-origin',
            body: filesForm
        })
            .then(res => { handleResponse(res, setUploadResult) })
            .catch(err => { handleError(err, setUploadResult) })
    }

    const onError = (errors: Object) => {
        FIELD_ORDER.every(field => {
            if (field in errors) {
                document.getElementById(field)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                return false
            }
            return true
        })
    }

    const [saveResultDialogOpen, setSaveResultDialogOpen] = useState(false)
    function closeSaveResultDialog() { setSaveResultDialogOpen(false) }
    function openSaveResultDialog() { setSaveResultDialogOpen(true) }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form style={{ width: '56vw', maxWidth: '640px' }} onSubmit={handleSubmit(onSubmit, onError)}>
                <PersonalDetails control={control} />
                <SuperDetails control={control} watch={watch} />
                <TaxDetails control={control} />
                <WorkEligibility control={control} />
                <FormButtons token={token} id={id} getValues={getValues} openSaveResultDialog={openSaveResultDialog} />
            </form>
            <ResultDialog
                handleOk={closeSubmissionResultDialog}
                open={submissionResultDialogOpen}
                loading={!formResult || !uploadResult}
                title='Submission Status'
                description={`Form submission: ${formResult}\n\nDocument upload: ${uploadResult}`}
            />
            <ResultDialog
                handleOk={closeSaveResultDialog}
                open={saveResultDialogOpen}
                loading={false}
                title='Save'
                description='Save completed.'
            />
        </Box>
    )
}

export default Form
