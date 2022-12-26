import * as yup from 'yup';

const schema = yup.object().shape({
  fullName: yup.string().required('Required'),
  superVisorName: yup.string().required('Required'),
  companyName: yup.string().required('Required'),
  projectName: yup.string().required('Required'),
  projectDate: yup.date().required('Required'),
  operation: yup.string().required('Required'),
  departmentOrUnit: yup.string().required('Required'),
  location: yup.string().required('Required'),
});

export default schema;
