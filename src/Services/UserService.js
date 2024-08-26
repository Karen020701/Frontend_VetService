export const createUser = async (user) => {
    try {
        const response = await fetch('http://localhost:8007/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'user',
                email: user.email,
                password: user.password,
                full_name: user.full_name,
                role: user.role
            }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
