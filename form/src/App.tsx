import { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress'
import { LoadingState, UrlParams } from './types'
import Form from './Form'

function App() {
    const [loadingState, setLoadingState] = useState(LoadingState.Loading)
    const params: UrlParams = useMemo(() => {
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

    const renderLoadingResult = () => {
        switch (loadingState) {
            case LoadingState.Loading: {
                return <CircularProgress size={56} />
            }
            case LoadingState.Unauthorized: {
                return <h1>{LoadingState.Unauthorized}</h1>
            }
            default: {
                return <h1>{LoadingState.Error}</h1>
            }
        }
    }

    const renderApp = () => {
        if (loadingState === LoadingState.Authorized) {
            return <Form id={params.id} token={params.token} />
        } else {
            return (
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {renderLoadingResult()}
                </header>
            )
        }
    }

    return (
        <div className="App">
            {renderApp()}
        </div>
    )
}

export default App;