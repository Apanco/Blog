import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppPrincipal from "./views/AppPrincipal"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <AppPrincipal/> } index />
            </Routes>
        </BrowserRouter>
    )
}
