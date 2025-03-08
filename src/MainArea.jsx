import { Box, Container } from "@mui/material";

const MainArea = (props) => {
    return (
        <Box sx={{ p: 0, width: "500px", height: "600px" }}>
            {props.children}
        </Box>
    );
};

export default MainArea;
