import React, { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
// import PropTypes from 'prop-types'
// import classNames from 'classnames'
// import { withStyles } from '@material-ui/core/styles'
import { styled, Theme, CSSObject } from '@mui/material/styles'

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import WrapLayout from './wrapLayout'
import HeaderInner from './header'
import SideBar from './sidebar'

import {
  ThemeProvider as ThemeProviderMui,
  createTheme,
} from '@mui/material/styles'
import {
  ThemeProvider as ThemeProviderNext,
  useTheme as useThemeNext,
} from 'next-themes'

// import RequireAuth from './requireAuth'
// import classes from './styles.module.scss'

// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
type Props = {
  children: ReactElement
}

const ThemeMui = ({ children }: Props) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const { theme } = useThemeNext()

  const themeMuiUi = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#509663',
          },
        },
        typography: {
          fontFamily: 'Poppins',
        },
        // typography: {
        //   fontSize: 13,
        // },
      }),
    [mode]
  )
  useEffect(() => {
    setMode(theme === 'dark' ? 'dark' : 'light')
  }, [theme])

  // useEffect only runs on the client, so now we can safely show the UI
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return <ThemeProviderMui theme={themeMuiUi}>{children}</ThemeProviderMui>
}

// config layout
const drawerWidth = 250
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
// config layout

const NestedLayout: React.FC<Props> = ({ children }: Props) => {
  const [open, setOpen] = React.useState(true)

  const handleDrawer = () => {
    setOpen(!open)
  }

  return (
    <WrapLayout>
      <ThemeProviderNext>
        <ThemeMui>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawer}
                  edge="start"
                  sx={{
                    marginRight: 5,
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <HeaderInner />
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader></DrawerHeader>
              <SideBar open={open} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              {children}
            </Box>
          </Box>
        </ThemeMui>
      </ThemeProviderNext>
    </WrapLayout>
  )
}

export default NestedLayout
