import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const HandleDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.actionCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.actionCancel}>
                    {props.actionCancelText}
                </Button>
                <Button onClick={props.actionOk} autoFocus>
                    {props.actionOkText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default HandleDialog;
