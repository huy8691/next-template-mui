import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch } from 'src/store/hooks'
import Grid from '@mui/material/Grid'
import { loginActions } from './loginSlice'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './validations'

// mui
import { styled } from '@mui/material/styles'
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

// mui

// layout
import type { ReactElement } from 'react'
import WrapLayout from 'src/layout/wrapLayout'
import type { NextPageWithLayout } from 'pages/_app.page'
import classes from './styles.module.scss'

const Login: NextPageWithLayout = () => {
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
    dispatch(loginActions.doLogin(values))
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
    <Grid container spacing={2}>
      <Grid item xs={5} style={{ position: 'relative' }}>
        <Image
          src="https://images.pexels.com/photos/13407813/pexels-photo-13407813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Picture of the author"
          width={500}
          height={500}
          layout="fill"
        />
      </Grid>
      <Grid item xs={7}>
        <div className={classes.loginContainer}>
          <>
            <Box mb={3}>
              <Link href="/">
                <a>
                  <img src="/images/logo.svg" alt="Logo" />
                </a>
              </Link>
            </Box>
            <Box mb={2}>
              <Typography variant="h3">Login</Typography>
            </Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes['form-login']}
            >
              <Box mb={2}>
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      // variant="standard"
                      label="Email"
                      helperText={errors.email && `${errors.email.message}`}
                      error={!!errors.email}
                    />
                  )}
                />
              </Box>
              <Box mb={3}>
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth>
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
            <Link href="/register">
              <a>Register</a>
            </Link>
          </>
        </div>
      </Grid>
    </Grid>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <WrapLayout>{page}</WrapLayout>
}
Login.theme = 'light'
export default Login
