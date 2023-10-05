import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Alert, Container } from "@mui/material";
import { z } from 'zod'
import useForm from "@/hooks/useForm";
import { AppDispatch, authActions, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// init login fields
const loginFields = {
    email: '',
    password: '',
}

//login validation schema
const schema = z.object({
	email: z.string().trim().min(1, 'Email is required').email(),
	password: z.string().min(1, 'Password is required').min(4, 'Password must be at least 6 characters'),
})


export default function Login() {
    
    const dispatch = useDispatch<AppDispatch>()
    const auth = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    const { setErrors, restForm, handleSubmit, handleChange, values, errors } = useForm(loginFields, values => {
    
        const result = schema.safeParse(values)
        //validate inputs
        if(!result.success) {
            setErrors(result.error.flatten().fieldErrors)
        } else {
            dispatch(authActions.login({ email: values.email, password: values.password }))
            .then(res => {

                if('error' in res) return;

                console.log('res', res)
                restForm()
                navigate('/')
            })

        }
    
    })


  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 15,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[100]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  FormHelperTextProps={{ sx: { fontSize: 16, mx: 0 } }}
                  helperText={errors.email && <Alert severity="error">{ errors.email.map((error, index) => <li key={index}>{ error }</li>) }</Alert> }
                  error={!!errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  FormHelperTextProps={{ sx: { fontSize: 16, mx: 0 } }}
                  helperText={errors.password && <Alert severity="error">{ errors.password.map((error, index) => <li key={index}>{ error }</li>) }</Alert> }
                  error={!!errors.password}
                />
               
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={auth.loading}
                >
                  Sign In
                </Button>

                { auth.loading && <p>loading...</p> }

                {/* @ts-ignore */}
                { !auth.loading && auth.error?.error?.message && <Alert severity="error">{ auth.error?.error?.message }</Alert> }

              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}