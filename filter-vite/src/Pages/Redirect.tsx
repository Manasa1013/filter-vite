import { Link , Box} from "@mui/material"

export interface RedirectProps {

}

export const Redirect = () => {
    return (
        <>
        <Box mt={2}>
            <h3>Please <Link href="/" underline="hover">Signup</Link> to view Posts page</h3>
        </Box>
        </>
    )
}