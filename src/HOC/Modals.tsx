import { Box, Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ReactElement, ReactNode, Ref, forwardRef } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Modals = ({ children, open }: { children: ReactNode; open: boolean }) => {
  return (
    <Dialog
      style={{ maxHeight: '500px' }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby='alert-dialog-slide-description'
    >
      <Box style={{ backgroundColor: 'indigo' }}>{children}</Box>
    </Dialog>
  );
};

export default Modals;
