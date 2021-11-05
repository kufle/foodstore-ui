import React from 'react';
import { LayoutOne, Card, Text, Button } from 'upkit';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {
    return(
        <LayoutOne size="small">
            <Card color="white">
                <div className="text-center">
                    <Text as="h3">
                        Registration Successfully
                    </Text>
                    <Text>
                        Please Login to Application
                    </Text>
                    <Link to="/login">
                        <Button fitContainer>
                            Login
                        </Button>
                    </Link>
                </div>
            </Card>
        </LayoutOne>
    )
}

export default RegisterSuccess;