import { Button } from "react-bootstrap"

interface SignedOutViewProps {
  onSignUpClicked: () => void
  onSignInClicked: () => void
}

const SignedOutView = ({ onSignInClicked, onSignUpClicked }: SignedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onSignInClicked}>Sign In</Button>
    </>
  )
}

export default SignedOutView