interface SignedOutViewProps {
  onSignUpClicked: () => void
  onSignInClicked: () => void
}

const SignedOutView = ({ onSignInClicked, onSignUpClicked }: SignedOutViewProps) => {
  return (
    <>
      <span style={{marginRight: '20px'}} className="pointer" onClick={onSignUpClicked}>Sign Up</span>
      <span onClick={onSignInClicked} className="pointer">Sign In</span>
    </>
  )
}

export default SignedOutView