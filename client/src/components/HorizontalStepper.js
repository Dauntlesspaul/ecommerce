import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Typography, Step, StepLabel, Stepper } from '@mui/material';

const StepperContainer = styled('div')({
  width: '100%',
});

const HorizontalStepper = ({ steps, activeStep }) => {
  return (
    <StepperContainer>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant="h6">{step.label}</Typography>
              {step.description && <Typography>{step.description}</Typography>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
};

HorizontalStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default HorizontalStepper;
