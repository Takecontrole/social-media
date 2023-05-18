import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"; 
import SelectForm from "../components/selectForm"
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'



const Login = () => {
  const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData
     const isNonMobile = useMediaQuery("(min-width:600px)"); 
     const { palette } = useTheme();
    const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
 const [showPassword, setShowPassword] = useState(false) 
 
 
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  } 
  
  
    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return ( 
          <Box> 
          <SelectForm/>
  
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          > 
                    <TextField 
             fullWidth
              label="Email"
              sx={{input: { background: `${alert.username ? '#fd2d6a14' : ''}`}, gridColumn: "span 4", m:"2" }}
              margin="normal"
              type="email" className="form-control" id="exampleInputEmail1" name="email"
                    onChange={handleChangeInput} value={email}
            error={alert.email ? alert.email : ''}
            helperText={alert.email ? alert.email : ''}
            />
          
                  
            <TextField 
            fullWidth
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment> 
              ),
          }}
              id="exampleInputPassword1"
               onChange={handleChangeInput} value={password} name="password"
              sx={{ gridColumn: "span 4" }}
              margin="normal"
               error={alert.password ? alert.password : ''}
            helperText={alert.password ? alert.password : ''}
            />  

                    <Box sx={{ gridColumn: "span 4" }} >
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              
           
                    В IT
                </Button>
       
              </Box>
            </Box>
        </form> 
            <Box  sx={{ mt: 2 }}>
             <Typography variant="subtitle1" component="span">
                    Забыли пaроль?{" "}
                </Typography>
                <Typography variant="subtitle1" component="span" sx={{ color: 'blue'}}>
                    Восстановление 
                </Typography>
                
                
          </Box>
          <Box>

                <Typography variant="subtitle1" component="span">
                    Нету аккаунта?{" "}
                </Typography>
                  <Link to="/register" style={{textDecoration:"none"}}>  
                <Typography variant="subtitle1" component="span" sx={{ color: 'blue'}}>
                    Регистрация
                </Typography>
                </Link>
                            </Box> 
                           
       </Box>
     </Box>
    )
}

export default Login
