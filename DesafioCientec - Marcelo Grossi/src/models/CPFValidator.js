class CPFValidator {
    static isValid(cpf) {
        //Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        //Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false;

        //Elimina CPFs com todos os dígitos iguais (exemplo: 111.111.111-11)
        if (/^(\d)\1+$/.test(cpf)) return false;

        //Calcula os dois dígitos verificadores
        const calcDigit = (factor) => {
            let sum = 0;
            for (let i = 0; i < factor - 1; i++) {
                sum += parseInt(cpf[i]) * (factor - i);
            }
            let remainder = (sum * 10) % 11;
            return remainder === 10 ? 0 : remainder;
        };

        const digit1 = calcDigit(10);
        const digit2 = calcDigit(11);

        //Verifica se os dígitos calculados correspondem aos do CPF
        return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
    }
}

module.exports = CPFValidator;

