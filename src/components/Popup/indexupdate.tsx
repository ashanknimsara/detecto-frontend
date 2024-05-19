
import { Dialog, DialogTitle, DialogContent,  Button } from '@mui/material';

export default function Popupupdate(props) {
    const { children, openPopupUpdate, setOpenPopupUpdate } = props;

    return (
        <Dialog open={openPopupUpdate} maxWidth="md">
            <DialogTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>UPDATE USER</div>
                    <Button variant="contained" color="error" onClick={() => setOpenPopupUpdate(false)}>X</Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}
 