import { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress'
import { LoadingState } from './types'
import Form from './Form'

function App() {
    const [loadingState, setLoadingState] = useState(LoadingState.Loading)
    const params: URLSearchParams = useMemo(() => new URLSearchParams(window.location.search), [])

    useEffect(() => {
        const body: { id: string, token: string } = {
            id: params.get('id') ?? '',
            token: params.get('token') ?? ''
        }

        if (body.id === '' || body.token === '') {
            setLoadingState(LoadingState.Error)
        } else {
            fetch('auth', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
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
                return <Form params={params} />
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