import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Controller } from 'react-hook-form'

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

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControl>
                    <FormLabel id={name + 'Label'}>{label}</FormLabel>
                    <RadioGroup value={value} onChange={onChange}>
                        {renderChoices()}
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
}

export default RadioInput