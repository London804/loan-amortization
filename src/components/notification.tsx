import { Attention} from '@/constants/loan.constant';
import {
    Alert,
    Stack,
} from "@mui/material";


export default function Notification(props: Attention) {
    const {type, message} = props

    switch (type) {
        case 'success':
            return (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success">{message}</Alert>
                </Stack>
            )
        case 'error':
            return (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{message}</Alert>
                </Stack>
            )
        default:
            return (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="info">{message}</Alert>
                </Stack>
            )
    }


}
