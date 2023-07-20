// import React from 'react'
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { ITransaction } from '../web3Types';




// export const TxModal = ({ address,_open,transaction }: ITransaction) => {
//     const [open, setOpen] = React.useState(false);
//     const handleClose = () => setOpen(false);

//     React.useEffect(() => {
//         setOpen(_open)
//     }, [_open])
//     const style = {
//         position: 'absolute' as 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         height: 600,
//         bgcolor: '#1c2424',
//         borderRadius: '20px',
//         border: '5px solid #16e6ef',
//         boxShadow: 24,
//         p: 4,
//     };
//     return (
//         <>
//             <div >
//                 <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="modal-modal-title"
//                     aria-describedby="modal-modal-description"
//                 >
//                     <Box sx={style} alignItems="center"
//                         justifyContent="center">
//                         <div style={{ display: 'flex', justifyContent: "center" }}>
//                             <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: "bolder", color: "white" }} >
//                                 <div style={{ fontSize: "14px" }}>{address}</div>
//                             </Typography>
//                             <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: "bolder", color: "white" }} >
//                                 {/* {napaWalletAccount.activeWalletAC} */}
//                             </Typography>
//                         </div>
//                         <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ fontWeight: "bolder", marginTop: "20px", color: "white" }} >
//                             Allow MarketPlace Listing
//                         </Typography>
//                         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                             <div style={{ display: 'flex', justifyContent: "space-around", marginTop: "300px" }}>
//                                 <Button variant="contained" onClick={handleClose} >Reject</Button>
//                                 <Button variant="contained" onClick={transaction}>Confirm</Button>
//                             </div>
//                         </Typography>
//                     </Box>
//                 </Modal>
//             </div>
//         </>
//     )
// }

export{}