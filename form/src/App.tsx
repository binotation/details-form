import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress'
import { LoadingState } from './types'

function App() {
    const [loadingState, setLoadingState] = useState(LoadingState.Loading)

    useEffect(() => {
        const qs: URLSearchParams = new URLSearchParams(window.location.search)
        const body: { id: string, token: string } = {
            id: qs.get('id') ?? '',
            token: qs.get('token') ?? ''
        }

        if (body.id === '' || body.token === '') {
            setLoadingState(LoadingState.Error)
            return;
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
    }, [])

    const loadingRender = () => {
        switch (loadingState) {
            case LoadingState.Error: {
                return <h1>{LoadingState.Error}</h1>
            }
            case LoadingState.Authorized: {
                return <h1>{LoadingState.Authorized}</h1>
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
