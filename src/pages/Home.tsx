import Form1 from "../forms/Form1";
import Form2 from "../forms/Form2";

export interface IHome {}

const Home: React.FunctionComponent<IHome> =() => {

    return(<>
      <Form1/>
    <Form2/>
    </>)
}

export default Home;