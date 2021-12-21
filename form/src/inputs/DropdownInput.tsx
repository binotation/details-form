import { Controller } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

function DropdownInput({ name, control, label, choices }:
    { name: string, control: any, label: string, choices: any }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value} label={label} variant='standard'>
                    {choices.map((choice: any, index: number) => (
                        <MenuItem key={index} value={choice.value}>
                            {choice.displayName}
                        </MenuItem>
                    ))}
                </Select>
            )}
        />
    )
}

export default DropdownInput