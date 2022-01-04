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

    const style = {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'row',
        justifyContent: 'center',
        marginTop: '24px'
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControl sx={style}>
                    <FormLabel id={name + 'Label'} sx={{ marginRight: '36px' }}>{label}</FormLabel>
                    <RadioGroup value={value} onChange={onChange} sx={{ display: 'flex', flexFlow: 'row' }}>
                        {renderChoices()}
                    </RadioGroup>
                </FormControl>
            )}
        />
    )
}

export default RadioInput