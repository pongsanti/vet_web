export const extract_string = (error) => ((error instanceof Object) ? extract_from_object(error) : error);

const extract_from_object = (error) => {
  if (error.hasOwnProperty('message')) {
    return error['message'];  
  } else if (error.hasOwnProperty('errors')) {
    return errors_object_to_text(error['errors']);
  } else {
    return ''
  }
}

const errors_object_to_text = (errors) => {
  let errorText = ''
  Object.keys(errors).map(key => {
    errorText += `${key} ${errors[key]} `
  });

  return errorText;
}
