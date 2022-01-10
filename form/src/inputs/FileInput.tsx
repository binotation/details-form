import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import { Controller } from 'react-hook-form'
import { buttonStyle } from '../exports/constants'

function FileInput({ name, control, label }: { name: string, control: any, label: string }) {

    const chooseFileButtonChangeHandler = (onChange: any) => {
        const files = (document.getElementById(name) as HTMLInputElement).files
        onChange(files)
    }

    const Buttons = ({ onChange }: { onChange: any }) => {
        const fileInputRef = React.useRef<HTMLInputElement>(null)

        return (
            <Box>
                <input
                    ref={fileInputRef}
                    id={name}
                    type='file'
                    multiple
                    hidden
                    onChange={() => chooseFileButtonChangeHandler(onChange)}
                />
                <Button variant='contained' onClick={() => { fileInputRef.current!.click() }} sx={buttonStyle}>
                    Choose files
                </Button>
                <Button variant='contained' onClick={() => { onChange([]) }} sx={buttonStyle}>
                    Clear files
                </Button>
            </Box>
        )
    }

    const FilesList = ({ files }: { files: FileList }) => {
        return (
            <List dense>
                {Array.from(files).map((file: File, index: number) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            secondary={`${file.size} bytes`}
                        >
                            {file.name}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
                return (
                    <Box sx={{ marginTop: '20px' }}>
                        <Box sx={{ marginBottom: '14px', textAlign: 'left' }}>
                            <label htmlFor={name} style={{ fontSize: '1.1rem' }}>{label}</label>
                        </Box>
                        <Buttons onChange={onChange} />
                        <FilesList files={value} />
                    </Box>
                )
            }}
        />
    )
}

export default FileInput