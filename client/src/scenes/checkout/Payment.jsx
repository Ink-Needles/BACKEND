import { Box, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Payment = ({ values, touched, errors, handleBlur, handleChange, setFieldValue }) => {
  const handlePaymentChange = (event) => {
    const selectedPayment = event.target.value;
    setFieldValue("cashOnDelivery", selectedPayment === "cash");
  };

  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>

      {/* PAYMENT METHOD */}
      <Box mt="20px">
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Payment Method
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Payment Method</FormLabel>
          <RadioGroup
            aria-label="payment method"
            name="paymentMethod"
            value={values.cashOnDelivery ? "cash" : "card"}
            onChange={handlePaymentChange}
          >
            <FormControlLabel value="card" control={<Radio />} label="Card (Visa, MasterCard, Stripe)" />
            <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Payment;