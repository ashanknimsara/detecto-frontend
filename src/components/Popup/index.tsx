
import { Dialog, DialogTitle, DialogContent,  Button } from '@mui/material';

export default function Popup(props) {
    const { children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>ADD NEW USER</div>
                    <Button variant="contained" color="error" onClick={() => setOpenPopup(false)}>X</Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}
