import { UrlParams } from './types'
import { DEFAULT_VALUES } from './constants'
import { useForm } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormButtons from './form-sections/FormButtons'
import PersonalDetails from './form-sections/PersonalDetails'
import SuperDetails from './form-sections/SuperDetails'

function Form({ id, token }: UrlParams) {
    const { handleSubmit, control, watch, formState, reset, getValues } = useForm({
        defaultValues: DEFAULT_VALUES
    })

    return (
        <FormControl>
            <PersonalDetails control={control} />
            <SuperDetails control={control} watch={watch} />
            <FormButtons handleSubmit={handleSubmit} id={id} token={token} />
        </FormControl>
    )
}

export default Form