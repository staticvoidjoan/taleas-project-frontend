import {render,screen, cleanup} from "@testing-library/react"
import Applicants from "../components/applicants/applicants"
import Unicorn from "../assets/images/Unicorn.png"

test("Should render applicant component", ()=>{
    render(<Applicants  name={"TestName"} lastname={"TestLastName"} profilePhoto={Unicorn} role={"TestRole"}/>)
    const applicantElement = screen.getByTestId("applicant-test")
    expect(applicantElement).toBeInTheDocument();
})