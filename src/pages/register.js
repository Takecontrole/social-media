import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme, 
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel, 
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

const Register = () => {
    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory() 
    const isNonMobile = useMediaQuery("(min-width:600px)"); 
     const { palette } = useTheme();
    const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); 
  const [showPassword, setShowPassword] = useState(false) 
 
 
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  } 
  

    const initialState = { 
        fullname: '', username: '', email: '', password: '', cf_password: '', gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { fullname, username, email, password, cf_password } = userData


    useEffect(() => {
        if(auth.token) history.push("/")
    }, [auth.token, history])

    
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
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
          <Box fullWidth
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >   

             <TextField 
              label="Имя"
              sx={{input: { background: `${alert.fullname ? '#fd2d6a14' : ''}`}, gridColumn: "span 2" }}
              type="text"
              id="fullname" 
              name="fullname"
                    onChange={handleChangeInput} value={fullname}
                    
            error={alert.fullname ? alert.fullname : ''}
            helperText={alert.fullname ? alert.fullname : ''}
            />
             <TextField 
              label="Никнейм"
              sx={{input: { background: `${alert.username ? '#fd2d6a14' : ''}`}, gridColumn: "span 2" }}
              type="text" className="form-control" id="username" name="username"
                    onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
            error={alert.username ? alert.username : ''}
            helperText={alert.username ? alert.username : ''}
            />
             <TextField 
             fullWidth
              label="email"
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
            <TextField
             fullWidth
              label="Повторите пароль"
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
              id="cf_password"
               onChange={handleChangeInput} value={cf_password} name="cf_password"
              sx={{ gridColumn: "span 4" }}
               error={alert.cf_password ? alert.cf_password : ''}
            helperText={alert.cf_password ? alert.cf_password : ''}
            />  
            
            <FormControl fullWidth>
  <FormLabel >Пол</FormLabel>
  <RadioGroup 
    sx={{width:"300px",display:"flex",flexDirection:"row"}}
    
    defaultValue="male"
    
  >
    <FormControlLabel 
    name="gender" 
    id="male" 
    value="male" 
    onChange={handleChangeInput}
    control={<Radio />} 
    label="Мужской" />
    <FormControlLabel 
    name="gender"
    id="female" 
    value="female" 
    onChange={handleChangeInput}
    control={<Radio />} 
    label="Женский" />
    <FormControlLabel 
    name="gender"
    id="other" 
    value="other"
    onChange={handleChangeInput} 
    value="other" 
    control={<Radio />} 
    label="Другой" />
  </RadioGroup>
</FormControl>

                     

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
          
          <Box>

                <Typography variant="subtitle1" component="span">
                    Есть аккаунт?{" "}
                </Typography>
                  <Link to="/" style={{textDecoration:"none"}}>  
                <Typography variant="subtitle1" component="span" sx={{ color: 'blue'}}>
                    Вход
                </Typography>
                </Link>
                            </Box> 
                              <Box  sx={{ mt: 2 }}>
             <Typography variant="subtitle1" component="span">
                    Регистрируясь вы соглашаетесь с {" "}
                </Typography>
                <Typography variant="subtitle1" component="span" sx={{ color: 'blue'}}>
                    политикой конфиденциальности 
                </Typography>
                
                
          </Box>
                           
       </Box>
     </Box>

    )
}

export default Register
