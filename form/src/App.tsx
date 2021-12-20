import { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress'
import { LoadingState } from './types'
import Form from './Form'

function App() {
    const [loadingState, setLoadingState] = useState(LoadingState.Loading)
    const params: { id: string, token: string } = useMemo(() => {
        const url = new URLSearchParams(window.location.search)
        return {
            id: url.get('id') ?? '',
            token: url.get('token') ?? ''
        }
    }, [])

    useEffect(() => {
        if (params.id === '' || params.token === '') {
            setLoadingState(LoadingState.Error)
        } else {
            fetch('auth', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
                .then(resp => {
                    switch (resp.status) {
                        case 401: {
                            setLoadingState(LoadingState.Unauthorized)
                            break
                        }
                        case 200: {
                            setLoadingState(LoadingState.Authorized)
                            break
                        }
                        default: {
                            setLoadingState(LoadingState.Error)
                        }
                    }
                })
        }
    }, [params])

    const loadingRender = () => {
        switch (loadingState) {
            case LoadingState.Error: {
                return <h1>{LoadingState.Error}</h1>
            }
            case LoadingState.Authorized: {
                return <Form id={params.id} token={params.token} />
            }
            case LoadingState.Unauthorized: {
                return <h1>{LoadingState.Unauthorized}</h1>
            }
            case LoadingState.Loading: {
                return <CircularProgress size={56} />
            }
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {loadingRender()}
            </header>
        </div>
    )
}

export default App;