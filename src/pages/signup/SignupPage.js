import React, { useState } from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import PageHeader from '../component/PageHeader';
import InputField from '../../componenets/form/InputField';
import Button from '../../componenets/controls/Button';
import { useUser } from '../../user/UserProvider';

const EMPTY_FORM = {
    name: '',
    email: '',
    password: '',
};

const SIGNUP_SCHEMA = {
    name: Joi.string().required().min(2).label('Name'),
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
};

const validateField = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: SIGNUP_SCHEMA[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
};

const SignupPage = () => {
    const [data, setData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const { register } = useUser();

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, SIGNUP_SCHEMA, options);

        if (!error) return null;

        const validationResults = {};
        error.details.forEach((errorEntry) => {
            validationResults[errorEntry.path[0]] = errorEntry.message;
        });
        return validationResults;
    };

    const signup = async () => {
        try {
            await register(data);
            toast.success(`${data.name} you signup successfully`);
            // TODO: redirect
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({
                    email: 'This user is already registered!',
                });
}
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors || {});
        if (validationErrors) return;
        signup();
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        const errorMessage = validateField({ name, value });
        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage,
        }));
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div
          style={{ minHeight: '85vh' }}
          className="container-fluid bg-light pb-4"
        >
            <div className="container">
                <PageHeader
                  title="Signup Page"
                  subTitle="hear you can signup and start collecting your favorite business cards"
                />
                <div className="center">
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      method="POST"
                      className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
                    >
                        <InputField
                          label="Name"
                          onChange={handleChange}
                          value={data.name}
                          name="name"
                          error={errors.name}
                        />
                        <InputField
                          label="Email"
                          onChange={handleChange}
                          value={data.email}
                          name="email"
                          type="email"
                          error={errors.email}
                        />
                        <InputField
                          label="Password"
                          onChange={handleChange}
                          value={data.password}
                          name="password"
                          type="password"
                          error={errors.password}
                        />
                        <Button label="Signup" type="submit" disabled={Boolean(validate())} />
                    </form>
                </div>
            </div>
        </div>
    );
};

SignupPage.propTypes = {

};

export default SignupPage;
