import styled from "styled-components/native";

export const InputWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #2e64e515;
`;

export const InputField = styled.TextInput`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-align: center;
  width: 90%;
  margin-bottom: 15px;
`;

export const AddImage = styled.Image`
  width: 98%;
  height: 50%;
  margin-bottom: 10px;
`;

export const AddImageProfile = styled.Image`
  width: 60%;
  height: 35%;
  margin-bottom: 10px;
`;

export const StatusWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background-color: #5390d9;
  border-radius: 5px;
  padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #edf2f4;
`;
