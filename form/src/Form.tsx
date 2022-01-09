import { UrlParams, FormValues } from './exports/types'
import { DEFAULT_VALUES } from './exports/constants'
import validationSchema from './exports/validationSchema'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import FormButtons from './form-sections/FormButtons'
import PersonalDetails from './form-sections/PersonalDetails'
import SuperDetails from './form-sections/SuperDetails'
import TaxDetails from './form-sections/TaxDetails'
import WorkEligibility from './form-sections/WorkEligibility'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'universal-cookie'
import CryptoJS from 'crypto-js'
import { saveHandler } from './exports/constants'

function Form({ id, token }: UrlParams) {
    const cookies = new Cookies()
    const savedDataCiphertext: string = cookies.get('savedData-' + id)
    let savedData;

    if (savedDataCiphertext !== undefined) {
        const savedDataDecrypted: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(savedDataCiphertext, CryptoJS.SHA256(token).toString())
        savedData = JSON.parse(savedDataDecrypted.toString(CryptoJS.enc.Utf8))
    }

    const { handleSubmit, control, watch, getValues } = useForm({
        defaultValues: savedData ?? DEFAULT_VALUES,
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const onSubmit = (data: FormValues) => {
        const body = { id, token, data }

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
                        alert('Submit success')
                        break
                    }
                    case 401: {
                        alert('Submit unauthorized')
                        break
                    }
                    default: {
                        alert('Submit error')
                    }
                }
            })
            .catch(err => {
                alert('Submit error')
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
        </Box>
    )
}

export default Form