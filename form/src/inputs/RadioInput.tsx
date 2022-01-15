import { Controller } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormHelperText from '@mui/material/FormHelperText'

function RadioInput({ name, control, choices, label }:
    { name: string, control: any, choices: { displayName: string, value: number | string }[], label?: string }) {

    const renderChoices = () => (
        choices.map((choice, index) => (
            <FormControlLabel
                key={index}
                value={choice.value}
                control={<Radio />}
                label={choice.displayName}
            />
        ))
    )

    const style = {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
        justifyContent: 'center',
        marginTop: '24px'
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <FormControl sx={style}>
                    <FormGroup sx={{ display: 'flex', flexFlow: 'row' }}>
                        <FormLabel id={name + 'Label'} sx={{ marginRight: '36px' }}>{label}</FormLabel>
                        <RadioGroup value={value} onChange={onChange} sx={{ display: 'flex', flexFlow: 'row' }}>
                            {renderChoices()}
                        </RadioGroup>
                    </FormGroup>
                    <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default RadioInput
