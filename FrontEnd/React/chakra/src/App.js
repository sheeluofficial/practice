//import logo from './logo.svg';
import './App.css';
import { Input ,Stack} from '@chakra-ui/react'
function App() {
  return (
    <div className="App">
     <Stack spacing={3}>
  <Input focusBorderColor='lime' placeholder='Here is a sample placeholder' />
  <Input
    focusBorderColor='pink.400'
    placeholder='Here is a sample placeholder'
  />
  <Input
    isInvalid
    errorBorderColor='red.300'
    placeholder='Here is a sample placeholder'
  />
  <Input
    isInvalid
    errorBorderColor='crimson'
    placeholder='Here is a sample placeholder'
  />
</Stack>
    </div>
  );
}

export default App;
