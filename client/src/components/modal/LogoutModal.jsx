import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, duration } from "@mui/material"

function LogoutModal() {
    function LogoutModal({ open, onClose, onLogout }) {
        const handleLogout = () => {
            onLogout();
            onClose();
        };

        return (
            <Modal>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out? Any unsaved changes may be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
            </Modal>
        );
    }
}

export default LogoutModal
