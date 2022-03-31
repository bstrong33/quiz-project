function Quiz(props) {

    const mappedQuestions = props.allQuestions.map((question, index) => {
    
        const mappedAnswers = props.allAnswers[index].map(answer => {
            return (
                <button className="Answers">
                    {answer.answer.replace(/[^a-zA-Z ]/g, "")}
                </button>
            )
        })
    
        return (
            <div>
                <h3>{question}</h3>
                {mappedAnswers}
            </div>
        )
    })

    return(
        <div>
            Quiz
            {mappedQuestions}
        </div>
    )
}

export default Quiz;