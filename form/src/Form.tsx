import { UrlParams } from './exports/types'
import { DEFAULT_VALUES } from './exports/constants'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import FormButtons from './form-sections/FormButtons'
import PersonalDetails from './form-sections/PersonalDetails'
import SuperDetails from './form-sections/SuperDetails'
import TaxDetails from './form-sections/TaxDetails'
import WorkEligibility from './form-sections/WorkEligibility'

function Form({ id, token }: UrlParams) {
    const { handleSubmit, control, watch, formState, reset, getValues } = useForm({
        defaultValues: DEFAULT_VALUES
    })

    const onSubmit = (data: any) => { console.log(data) }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form style={{ width: '36vw', maxWidth: '640px' }} onSubmit={handleSubmit(onSubmit)}>
                <PersonalDetails control={control} />
                <SuperDetails control={control} watch={watch} />
                <TaxDetails control={control} />
                <WorkEligibility control={control} />
                <FormButtons />
            </form>
        </Box>
    )
}

export default Form