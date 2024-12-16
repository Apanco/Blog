import { BrowserRouter, Routes, Route } from "react-router-dom"
import LayourPrincipal from "./Layouts/AppPrincipal"
import AppPrincipal from "./views/AppPrincipal"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <LayourPrincipal/> }>
                    <Route path="/" element={ <AppPrincipal/> } index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
