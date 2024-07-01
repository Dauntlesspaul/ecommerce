import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Typography, Step, StepLabel, Stepper } from '@mui/material';

const StepperContainer = styled('div')({
  width: '100%',
});

const VerticalStepper = ({ steps, activeStep }) => {
  return (
    <StepperContainer>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography sx={{fontSize:'18px'}}>{step.label}</Typography>
              {step.description && <Typography sx={{fontSize:'16px'}}>{step.description}</Typography>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
};

VerticalStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default VerticalStepper;
