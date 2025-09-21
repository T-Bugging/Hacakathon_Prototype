import streamlit as st
import json
from combined_with_link_headline import verify_headline_or_url

st.title("AI Misinformation Verifier")

headline_or_url = st.text_input("Paste a headline or article link:")

if st.button("Verify"):
    with st.spinner("Verifying..."):
        result_str, sources = verify_headline_or_url(headline_or_url)

        # Parse JSON string into a Python dict
        try:
            result = json.loads(result_str)
        except Exception:
            result = {"Verdict": result_str}

        # Display as a simple list
        st.write("**Verification Result:**")
        for key, value in result.items():
            st.write(f"- {key.capitalize()}: {value}")

        # Display sources
        if sources:
            st.write("**Sources:**")
            for src in sources[:5]:  # Show only first 5 sources
                st.write("-", src)
