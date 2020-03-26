<script>
// TODO: Redirect to the topics page for now. Update after there is an onboarding page.
export default {
  middleware({ app, redirect }) {
    return redirect('https://www.factchecklab.org')
  }
}
</script>
