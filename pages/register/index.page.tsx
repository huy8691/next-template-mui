import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch } from 'src/store/hooks'
import Grid from '@mui/material/Grid'
import { registerActions } from './registerSlice'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validations'

// mui
// import { Dayjs } from 'dayjs'
import * as dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// mui

// layout
// layout
import type { ReactElement } from 'react'
import WrapLayout from 'src/layout/wrapLayout'
import type { NextPageWithLayout } from 'pages/_app.page'

import classes from './styles.module.scss'

const Register: NextPageWithLayout = () => {
  const [valueDay, setValueDay] = React.useState<dayjs.Dayjs | null>(null)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()

  const onSubmit = (values: any) => {
    console.log('onSubmit', values)
    // dispatch(registerActions.doRegister(values))
  }

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={4} style={{ position: 'relative' }}>
        <Image
          src="https://images.pexels.com/photos/2473990/pexels-photo-2473990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Picture of the author"
          width={500}
          height={500}
          layout="fill"
        />
      </Grid>
      <Grid item xs={8}>
        <div className={classes.registerContainer}>
          <>
            <Box mb={3}>
              <Link href="/">
                <a>
                  <img src="/images/logo.png" alt="Logo" />
                </a>
              </Link>
            </Box>
            <Box mb={2}>
              <Typography variant="h3">Register</Typography>
            </Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes['form-register']}
            >
              <Box mb={1}>
                <Controller
                  control={control}
                  name="dob"
                  defaultValue={valueDay}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Dob"
                        onChange={(newValue) => setValueDay(newValue)}
                        renderInput={(params: any) => (
                          <TextField
                            fullWidth
                            variant="standard"
                            {...params}
                            helperText={errors.dob && `${errors.dob.message}`}
                            error={!!errors.dob}
                          />
                        )}
                        {...field}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Box>
              <Box mb={1}>
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      variant="standard"
                      label="Email"
                      helperText={errors.email && `${errors.email.message}`}
                      error={!!errors.email}
                    />
                  )}
                />
              </Box>
              <Box mb={2}>
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl variant="standard" fullWidth>
                      <InputLabel
                        htmlFor="standard-adornment-password"
                        error={!!errors.password}
                      >
                        Password
                      </InputLabel>
                      <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        error={!!errors.password}
                      />
                      <FormHelperText id="my-helper-text" error>
                        {errors.password && `${errors.password.message}`}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Box>

              {/* <Controller
                control={control}
                name="remember"
                render={({ field }) => (
                  <Form.Item valuePropName="checked">
                    <Checkbox {...field}>Lưu mật khẩu</Checkbox>
                  </Form.Item>
                )}
              /> */}
              <Box mb={2}>
                <Button variant="contained" size="large" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </>
        </div>
      </Grid>
    </Grid>
  )
}
Register.getLayout = function getLayout(page: ReactElement) {
  return <WrapLayout>{page}</WrapLayout>
}
Register.theme = 'light'

export default Register
