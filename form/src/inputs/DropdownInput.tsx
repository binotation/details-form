import { Controller } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

function DropdownInput({ name, control, label, choices }:
    { name: string, control: any, label: string, choices: any }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <FormControl>
                    <InputLabel id={name + '-label'} >{label}</InputLabel>
                    <Select
                        onChange={onChange}
                        value={value}
                        labelId={name + '-label'}
                        variant='standard'
                    >
                        {choices.map((choice: any, index: number) => (
                            <MenuItem key={index} value={choice.value}>
                                {choice.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    )
}

export default DropdownInput