import { Button, Snackbar } from "@mui/material";
import { useToast } from "../Contexts/ToastContext";

export const Toast: () => void = () => {
    const { toast, toggleToast } = useToast();
    return (
        <>
            <Button onClick={() => {
                console.log("toast clicked")
                toggleToast();
            }}>Open simple snackbar</Button>
            <Snackbar
            // open={open}
            autoHideDuration={6000}
                onClose={() => {
                console.log("handle closed")
            }}
            message="Note archived"
            // action={action}
            />
        </>
    )
}