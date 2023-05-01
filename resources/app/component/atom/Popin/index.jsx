import * as React from 'react'
import styled from "styled-components"

const Wrapper = styled.div`
        background: #f0f0f08a;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        `
const Container = styled.div`
        margin: 5em;
        background: white;
        width: 50em;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
        `

export default function Popin(props) {

    return (
        <Wrapper>
            <Container>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-2">{ props.head ? props.head : '' }</h1>
                    <a className="btn btn-success btn-circle m-2" onClick={() => props.onClose && props.onClose()}>
                        <i className="fa fa-window-close"/>
                    </a>
                </div>
                <div className="d-sm-flex align-items-center  mb-4">
                    {props.children}
                </div>
            </Container>
        </Wrapper>
    )
}
