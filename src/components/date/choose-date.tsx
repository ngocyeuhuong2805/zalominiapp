import React from 'react';
import { DatePicker, Box } from 'zmp-ui';
import { string } from 'prop-types';
import { DatePickerProps } from 'zmp-ui/date-picker';

interface Props {
  
  title?: string;
  label?: string;
  helperText?: string;
  value?: Date;
  onChange: DatePickerProps['onChange'];
  disable?:false;
}

const ChooseDate: React.FunctionComponent<Props> = (props) => {
  const { title, label, helperText, value, onChange, disable } = props;

  return (
    <Box mt={1}>
      <DatePicker
        defaultOpen = {false}
        onChange={onChange}
        value={value}
        label={label}
        helperText={helperText}
        mask
        maskClosable
        dateFormat="dd/mm/yyyy"
        title={title}
        disabled = {disable}
      />
    </Box>
  );
};

export default ChooseDate;